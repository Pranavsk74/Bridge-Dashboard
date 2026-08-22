import { IReportProvider } from './interfaces';
import { Bridge, Prediction, SensorReading, ContextualFeatures, Report } from '@/models/types';

export class MockReportProvider implements IReportProvider {
  public generateReport(
    bridge: Bridge,
    prediction: Prediction,
    reading: SensorReading,
    context: ContextualFeatures,
    history: SensorReading[]
  ): Report {
    const timestamp = new Date().toISOString();
    const id = `CP-REP-${Date.now().toString(36).toUpperCase()}`;

    let aiAssessment = '';
    let recommendedInspection = '';

    if (prediction.riskLevel === 'CRITICAL' || prediction.riskLevel === 'HIGH') {
      aiAssessment = `ELEVATED ANOMALY PROBABILITY (${prediction.anomalyProbability}%) DETECTED ACROSS PRIMARY SENSOR VECTOR AND CONTEXTUAL PARAMETERS. SIGNIFICANT DEVIATION OBSERVED IN ${prediction.problematicFeatures.map(f => f.name.toUpperCase()).join(', ') || 'STRUCTURAL TELEMETRY'}. RELATIVE DEVIATION PROFILE SUGGESTS UNCHARACTERISTIC STRUCTURAL RESPONSE UNDER CURRENT LOADING CONDITIONS AND CONTEXT (AGE: ${context.bridge_age_years} YRS, RAINFALL: ${context.rainfall_mm}mm).`;
      recommendedInspection = `PRIORITY TIER-1 ON-SITE STRUCTURAL INSPECTION RECOMMENDED WITHIN 24 HOURS. DEPLOY PORTABLE ULTRASONIC NDT GAUGE TO STEEL GIRDER FLANGES AND VERIFY EXPANSION JOINT DECK LVDT ALIGNMENT. MONITOR TELEMETRY IN HIGH-FREQUENCY SAMPLING MODE.`;
    } else if (prediction.riskLevel === 'ELEVATED' || prediction.riskLevel === 'MODERATE') {
      aiAssessment = `MODERATE TELEMETRY DEVIATION DETECTED. ANOMALY PROBABILITY AT ${prediction.anomalyProbability}%. PRIMARY CONTRIBUTING PARAMETERS INCLUDE ${prediction.problematicFeatures.slice(0, 2).map(f => f.name.toUpperCase()).join(' AND ') || 'VIBRATION RMS'}. CURRENT SENSOR SIGNAL EXCEEDS NOMINAL BASELINE BUT REMAINS WITHIN OPERATIONAL MARGINS.`;
      recommendedInspection = `SCHEDULED ROUTINE NDT INSPECTION TO BE CONDUCTED WITHIN 7 DAYS. MONITOR REAL-TIME DEVIATION TRENDS FOR PERSISTENT DRIFT OR AMPLIFICATION UNDER PEAK HOUR TRAFFIC LOADS.`;
    } else {
      aiAssessment = `NOMINAL STRUCTURAL PERFORMANCE. ANOMALY PROBABILITY IS LOW AT ${prediction.anomalyProbability}%. HEALTH SCORE IS OPTIMAL AT ${prediction.healthScore}/100. ALL 10 STRUCTURAL SENSOR CHANNELS OPERATING WITHIN REFERENCE ENVELOPES.`;
      recommendedInspection = `CONTINUE AUTOMATED REAL-TIME TELEMETRY STREAMING. NEXT REGULAR PREVENTIVE MAINTENANCE SCHEDULED AS PER ANNUAL STRUCTURAL AUDIT CALENDAR.`;
    }

    return {
      id,
      bridge,
      prediction,
      currentReading: reading,
      contextualFeatures: context,
      historicalReadings: history,
      generatedAt: timestamp,
      aiAssessment,
      recommendedInspection,
      dataSource: 'SIMULATION STREAM / ESP32 HARDWARE INTEGRATION SPACE',
      modelInfo: 'CLAUDE\'S PLAN — XGBoost Supervised Anomaly Ensemble (13-Feature Matrix)',
      disclaimer:
        'PROTOTYPE / ML-BASED STRUCTURAL ANALYSIS. THIS REPORT CONTAINS PROTOTYPE DATA-DERIVED THRESHOLDS AND DOES NOT CONSTITUTE A CERTIFIED STRUCTURAL SAFETY DEDUCTION. ALL ASSESSMENTS REQUIRE QUALIFIED PROFESSIONAL CIVIL/STRUCTURAL ENGINEERING VALIDATION.',
    };
  }
}
