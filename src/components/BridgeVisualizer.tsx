import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SensorReading } from '@/models/types';
import { Camera, Eye } from 'lucide-react';

interface BridgeVisualizerProps {
  reading: SensorReading;
}

// Persistent camera & rotation state across renders and section navigation
let persistentCameraPos = new THREE.Vector3(40, 25, 55);
let persistentBridgeRot = new THREE.Euler(0, 0, 0);

export const BridgeVisualizer: React.FC<BridgeVisualizerProps> = ({ reading }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [selectedSensorMeta, setSelectedSensorMeta] = useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bridgeGroupRef = useRef<THREE.Group | null>(null);
  const deckMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      // Three.js Scene Setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x2f2116);

      // Camera with persistent position
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.copy(persistentCameraPos);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Renderer with WebGL Fallback Safety
      renderer = new THREE.WebGLRenderer({ antialias: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Architectural Lighting
      const ambientLight = new THREE.AmbientLight(0xffebd0, 0.7);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xfee197, 1.2);
      dirLight.position.set(30, 50, 40);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0x987f61, 0.5);
      fillLight.position.set(-30, 20, -30);
      scene.add(fillLight);

      // Architectural CAD Grid Floor
      const gridHelper = new THREE.GridHelper(80, 40, 0xfee197, 0x4f3622);
      gridHelper.position.y = -8;
      scene.add(gridHelper);

      // Construct 3D Bridge CAD Assembly Group
      const bridgeGroup = new THREE.Group();
      bridgeGroup.rotation.copy(persistentBridgeRot);
      bridgeGroupRef.current = bridgeGroup;

      // 01. BASE PIERS
      const pierMat = new THREE.MeshStandardMaterial({
        color: 0x4f3622,
        roughness: 0.8,
        metalness: 0.2,
      });

      const pierGeo = new THREE.BoxGeometry(4, 16, 6);

      const pier1 = new THREE.Mesh(pierGeo, pierMat);
      pier1.position.set(-24, 0, 0);
      bridgeGroup.add(pier1);

      const pier2 = new THREE.Mesh(pierGeo, pierMat);
      pier2.position.set(0, 0, 0);
      bridgeGroup.add(pier2);

      const pier3 = new THREE.Mesh(pierGeo, pierMat);
      pier3.position.set(24, 0, 0);
      bridgeGroup.add(pier3);

      // 02. MAIN DECK GIRDERS (WITH THERMAL COLOR MAPPING)
      let thermalColor = new THREE.Color(0xffebd0);
      if (reading.temp_deck_c > 38) {
        thermalColor.setHex(0xB8755B);
      } else if (reading.temp_deck_c < 20) {
        thermalColor.setHex(0x8FA7A8);
      } else {
        thermalColor.setHex(0xffebd0);
      }

      const deckMat = new THREE.MeshStandardMaterial({
        color: thermalColor,
        roughness: 0.4,
        metalness: 0.6,
      });

      const deckGeo = new THREE.BoxGeometry(60, 1.2, 8);
      const deckMesh = new THREE.Mesh(deckGeo, deckMat);
      deckMesh.position.set(0, 8.6, 0);
      deckMeshRef.current = deckMesh;
      bridgeGroup.add(deckMesh);

      // 03. TRUSS SUPERSTRUCTURE
      const trussMat = new THREE.MeshStandardMaterial({
        color: 0x987f61,
        wireframe: false,
        roughness: 0.5,
      });

      const trussGroup = new THREE.Group();
      const spanWidth = 60;
      const numTrusses = 10;
      const trussStep = spanWidth / numTrusses;

      for (let i = 0; i <= numTrusses; i++) {
        const x = -spanWidth / 2 + i * trussStep;
        const postGeo = new THREE.CylinderGeometry(0.3, 0.3, 8, 8);
        const postMesh = new THREE.Mesh(postGeo, trussMat);
        postMesh.position.set(x, 13, -3.8);
        trussGroup.add(postMesh);

        const postMesh2 = postMesh.clone();
        postMesh2.position.z = 3.8;
        trussGroup.add(postMesh2);

        if (i < numTrusses) {
          const diagGeo = new THREE.CylinderGeometry(0.2, 0.2, 9.8, 8);
          const diagMesh = new THREE.Mesh(diagGeo, trussMat);
          diagMesh.position.set(x + trussStep / 2, 13, -3.8);
          diagMesh.rotation.z = Math.PI / 4;
          trussGroup.add(diagMesh);

          const diagMesh2 = diagMesh.clone();
          diagMesh2.position.z = 3.8;
          trussGroup.add(diagMesh2);
        }
      }

      const topChordGeo = new THREE.BoxGeometry(60, 0.6, 0.6);
      const topChord1 = new THREE.Mesh(topChordGeo, trussMat);
      topChord1.position.set(0, 17, -3.8);
      trussGroup.add(topChord1);

      const topChord2 = topChord1.clone();
      topChord2.position.z = 3.8;
      trussGroup.add(topChord2);

      bridgeGroup.add(trussGroup);

      // 04. SENSOR MARKERS
      const sensorGroup = new THREE.Group();
      sensorGroup.name = "SENSOR_GROUP";

      const sensorMat = new THREE.MeshBasicMaterial({ color: 0xfee197 });
      const sensorGeo = new THREE.SphereGeometry(0.9, 16, 16);

      const s1 = new THREE.Mesh(sensorGeo, sensorMat);
      s1.position.set(0, 9.8, 0);
      s1.userData = { title: "TRANSDUCER S03 (MIDSPAN STRAIN)", val: `${reading.strain_microstrain} µε` };
      sensorGroup.add(s1);

      const s2 = new THREE.Mesh(sensorGeo, sensorMat);
      s2.position.set(-12, 9.8, 0);
      s2.userData = { title: "TRANSDUCER S01 (WEST VIBRATION)", val: `${reading.vibration_rms_g} g` };
      sensorGroup.add(s2);

      const s3 = new THREE.Mesh(sensorGeo, sensorMat);
      s3.position.set(12, 9.8, 0);
      s3.userData = { title: "TRANSDUCER S02 (PIER TILT)", val: `${reading.tilt_deg}°` };
      sensorGroup.add(s3);

      bridgeGroup.add(sensorGroup);
      scene.add(bridgeGroup);

      // Mouse Drag Interaction
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && bridgeGroupRef.current) {
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;

          bridgeGroupRef.current.rotation.y += deltaX * 0.005;
          bridgeGroupRef.current.rotation.x += deltaY * 0.005;

          persistentBridgeRot.copy(bridgeGroupRef.current.rotation);
          previousMousePosition = { x: e.clientX, y: e.clientY };
        }
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      const handleWheel = (e: WheelEvent) => {
        if (cameraRef.current) {
          cameraRef.current.position.z = THREE.MathUtils.clamp(
            cameraRef.current.position.z + e.deltaY * 0.05,
            20,
            120
          );
          persistentCameraPos.copy(cameraRef.current.position);
        }
      };

      const domElement = renderer.domElement;
      domElement.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      domElement.addEventListener('wheel', handleWheel);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const sGrp = bridgeGroup.getObjectByName("SENSOR_GROUP");
        if (sGrp) sGrp.visible = showSensors;

        const strainFlex = (reading.strain_microstrain - 500) * 0.002;
        deckMesh.position.y = 8.6 - Math.max(0, strainFlex);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth || 600;
        const h = mountRef.current.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        domElement.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        domElement.removeEventListener('wheel', handleWheel);
        if (container.contains(domElement)) {
          container.removeChild(domElement);
        }
      };
    } catch (err) {
      console.warn("WebGL Initialization Exception caught:", err);
      setWebGlSupported(false);
    }
  }, [reading, showSensors]);

  const setCameraPreset = (view: 'RESET' | 'TOP' | 'FRONT' | 'SIDE' | 'ISOMETRIC') => {
    if (!cameraRef.current || !bridgeGroupRef.current) return;
    const camera = cameraRef.current;
    const bridgeGroup = bridgeGroupRef.current;

    bridgeGroup.rotation.set(0, 0, 0);
    persistentBridgeRot.set(0, 0, 0);

    switch (view) {
      case 'TOP':
        camera.position.set(0, 75, 0.1);
        break;
      case 'FRONT':
        camera.position.set(0, 10, 60);
        break;
      case 'SIDE':
        camera.position.set(60, 10, 0);
        break;
      case 'ISOMETRIC':
        camera.position.set(35, 35, 35);
        break;
      case 'RESET':
      default:
        camera.position.set(40, 25, 55);
        break;
    }
    camera.lookAt(0, 0, 0);
    persistentCameraPos.copy(camera.position);
  };

  if (!webGlSupported) {
    return (
      <div className="w-full h-[450px] border border-[#4f3622] bg-[#2f2116] flex flex-col items-center justify-center p-6 text-center font-mono space-y-2">
        <span className="text-[#fee197] font-medium text-caption-oryzo uppercase">
          3D CAD VIEWPORT // WEBGL CONTEXT
        </span>
        <span className="text-[#ffebd0] text-legal-oryzo">
          BRIDGE MODEL PENDING // WEBGL ACCELERATION UNAVAILABLE
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] border border-[#4f3622] bg-[#2f2116] overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute top-4 left-4 pointer-events-none font-mono text-legal-oryzo space-y-1">
        <div className="text-[#fee197] font-medium flex items-center space-x-2">
          <Camera className="w-4 h-4 text-[#fee197]" />
          <span>3D CAD VIEWPORT // STEP MODEL ASSEMBLY</span>
        </div>
        <div className="text-[#987f61]">DRAG TO INSPECT · SCROLL TO ZOOM</div>
      </div>

      <div className="absolute top-4 right-4 flex flex-wrap items-center gap-1.5 font-mono text-legal-oryzo">
        {(['RESET', 'TOP', 'FRONT', 'SIDE', 'ISOMETRIC'] as const).map((preset) => (
          <button
            key={preset}
            onClick={() => setCameraPreset(preset)}
            className="px-2.5 py-1 bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] hover:border-[#fee197] hover:text-[#fee197] transition-all"
          >
            {preset}
          </button>
        ))}

        <button
          onClick={() => setShowSensors(!showSensors)}
          className={`px-2.5 py-1 border transition-all flex items-center space-x-1 ${
            showSensors
              ? 'bg-[#000000] text-[#fee197] border-[#fee197]'
              : 'bg-[#2f2116] text-[#987f61] border-[#4f3622]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>SENSORS</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-[#2f2116]/90 border border-[#4f3622] p-3 font-mono text-legal-oryzo space-y-1">
        <span className="text-[#987f61] block">THERMAL MAPPING:</span>
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-[#8FA7A8] inline-block" /><span>COOL</span></span>
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-[#ffebd0] inline-block" /><span>NORMAL</span></span>
          <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-[#B8755B] inline-block" /><span>HOT</span></span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-legal-oryzo text-right bg-[#2f2116]/90 p-3 border border-[#4f3622]">
        <span className="text-[#987f61] block">TELEMETRY DEFORMATION & TILT</span>
        <span className="text-[#ffebd0] font-medium text-caption-oryzo">
          {reading.strain_microstrain} µε STRAIN // {reading.tilt_deg}° TILT
        </span>
      </div>
    </div>
  );
};
