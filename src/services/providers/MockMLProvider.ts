import { IMLProvider } from './interfaces';
import {
  SensorReading,
  ContextualFeatures,
  Prediction,
  FeatureContribution,
  RiskLevel,
  SensorKey,
} from '@/models/types';
import { SENSOR_METADATA } from './MockSensorProvider';

export class MockMLProvider implements IMLProvider {
  public async assessHealth(
    reading: SensorReading,
    context?: ContextualFeatures
  ): Promise<Prediction> {
    const keys: SensorKey[] = [
      'strain_microstrain',
      'vibration_rms_g',
      'vibration_peak_g',
      'vibration_dom_freq_hz',
      'temp_deck_c',
      'temp_ambient_c',
      'tilt_deg',
      'humidity_pct',
      'displacement_mm',
      'traffic_load_index',
    ];

    const ctx = context || {
      bridge_age_years: 24,
      traffic_index: 0.45,
      rainfall_mm: 18,
      ambient_temp_c: 26,
      environmental_salinity_pct: 3.5,
    };

    const baselineValues: Record<SensorKey, number> = {} as Record<SensorKey, number>;
    const normalizedFeatures: Record<SensorKey, number> = {} as Record<SensorKey, number>;
    const rawContributions: Array<FeatureContribution & { rawScore: number }> = [];

    const featureWeights: Record<SensorKey, number> = {
      strain_microstrain: 0.22,
      displacement_mm: 0.18,
      vibration_rms_g: 0.16,
      tilt_deg: 0.14,
      vibration_peak_g: 0.10,
      vibration_dom_freq_hz: 0.08,
      temp_deck_c: 0.04,
      traffic_load_index: 0.04,
      temp_ambient_c: 0.02,
      humidity_pct: 0.02,
    };

    let totalWeightedScore = 0;

    // Process Structural Features
    keys.forEach((key) => {
      const meta = SENSOR_METADATA[key];
      const val = reading[key];
      const ref = meta.reference;
      baselineValues[key] = ref;

      const ratio = val / ref;
      normalizedFeatures[key] = Number(ratio.toFixed(2));
      const devPct = ((val - ref) / ref) * 100;
      const stdDev = ref * 0.15;
      const zScore = Number(((val - ref) / stdDev).toFixed(2));

      let devFactor = Math.max(0, (val - meta.reference) / (meta.criticalThreshold - meta.reference));
      if (devFactor > 1.5) devFactor = 1.5;

      const score = Math.pow(devFactor, 1.4) * featureWeights[key] * 100;
      totalWeightedScore += score;

      let impactLevel: FeatureContribution['impactLevel'] = 'NORMAL';
      if (devPct > 50 || zScore > 2.5) impactLevel = 'SEVERE';
      else if (devPct > 25 || zScore > 1.5) impactLevel = 'HIGH';
      else if (devPct > 10) impactLevel = 'MODERATE';
      else if (devPct > 0) impactLevel = 'LOW';

      rawContributions.push({
        key,
        name: meta.name,
        category: 'STRUCTURAL',
        currentValue: val,
        referenceValue: ref,
        deviationPct: Number(devPct.toFixed(1)),
        zScore,
        contributionPct: 0,
        impactLevel,
        rawScore: score,
      });
    });

    // Process Contextual Features
    const ctxFactorAge = Math.max(0, (ctx.bridge_age_years - 10) / 40);
    const ctxFactorRain = Math.max(0, ctx.rainfall_mm / 100);
    const ctxFactorTraffic = ctx.traffic_index;

    const ctxAgeScore = ctxFactorAge * 8;
    const ctxRainScore = ctxFactorRain * 12;
    const ctxTrafficScore = ctxFactorTraffic * 10;

    totalWeightedScore += ctxAgeScore + ctxRainScore + ctxTrafficScore;

    rawContributions.push({
      key: 'bridge_age_years',
      name: 'Bridge Structure Age',
      category: 'CONTEXTUAL',
      currentValue: ctx.bridge_age_years,
      referenceValue: 15,
      deviationPct: Number((((ctx.bridge_age_years - 15) / 15) * 100).toFixed(1)),
      zScore: Number(((ctx.bridge_age_years - 15) / 5).toFixed(2)),
      contributionPct: 0,
      impactLevel: ctx.bridge_age_years > 30 ? 'HIGH' : ctx.bridge_age_years > 20 ? 'MODERATE' : 'LOW',
      rawScore: ctxAgeScore,
    });

    rawContributions.push({
      key: 'rainfall_mm',
      name: 'Precipitation / Rainfall',
      category: 'CONTEXTUAL',
      currentValue: ctx.rainfall_mm,
      referenceValue: 10,
      deviationPct: Number((((ctx.rainfall_mm - 10) / 10) * 100).toFixed(1)),
      zScore: Number(((ctx.rainfall_mm - 10) / 15).toFixed(2)),
      contributionPct: 0,
      impactLevel: ctx.rainfall_mm > 50 ? 'SEVERE' : ctx.rainfall_mm > 25 ? 'HIGH' : 'LOW',
      rawScore: ctxRainScore,
    });

    rawContributions.push({
      key: 'traffic_index',
      name: 'Traffic Density Index',
      category: 'CONTEXTUAL',
      currentValue: ctx.traffic_index,
      referenceValue: 0.40,
      deviationPct: Number((((ctx.traffic_index - 0.40) / 0.40) * 100).toFixed(1)),
      zScore: Number(((ctx.traffic_index - 0.40) / 0.15).toFixed(2)),
      contributionPct: 0,
      impactLevel: ctx.traffic_index > 0.8 ? 'HIGH' : ctx.traffic_index > 0.6 ? 'MODERATE' : 'LOW',
      rawScore: ctxTrafficScore,
    });

    const sumRawScores = rawContributions.reduce((acc, c) => acc + c.rawScore, 0) || 1;

    const featureContributions: FeatureContribution[] = rawContributions
      .map((c) => ({
        key: c.key,
        name: c.name,
        category: c.category,
        currentValue: c.currentValue,
        referenceValue: c.referenceValue,
        deviationPct: c.deviationPct,
        zScore: c.zScore,
        contributionPct: Number(((c.rawScore / sumRawScores) * 100).toFixed(1)),
        impactLevel: c.impactLevel,
      }))
      .sort((a, b) => b.contributionPct - a.contributionPct);

    const structuralContributions = featureContributions.filter((f) => f.category === 'STRUCTURAL');
    const contextualContributions = featureContributions.filter((f) => f.category === 'CONTEXTUAL');

    const rawProb = 100 / (1 + Math.exp(-0.08 * (totalWeightedScore - 25)));
    const anomalyProbability = Number(Math.min(99.4, Math.max(1.2, rawProb)).toFixed(1));
    const healthScore = Math.round(100 - anomalyProbability * 0.85);

    let riskLevel: RiskLevel = 'LOW';
    if (anomalyProbability > 75) riskLevel = 'CRITICAL';
    else if (anomalyProbability > 50) riskLevel = 'HIGH';
    else if (anomalyProbability > 30) riskLevel = 'ELEVATED';
    else if (anomalyProbability > 15) riskLevel = 'MODERATE';

    const problematicFeatures = featureContributions.filter(
      (f) => f.impactLevel !== 'NORMAL' && f.impactLevel !== 'LOW'
    );

    return {
      anomalyProbability,
      healthScore,
      riskLevel,
      confidence: 91.2,
      featureContributions,
      structuralContributions,
      contextualContributions,
      normalizedFeatures,
      baselineValues,
      problematicFeatures,
      evaluatedAt: new Date().toISOString(),
    };
  }

  public getModelMetadata() {
    return {
      primaryModel: 'XGBoost Gradient Boosting (Ensemble)',
      task: 'SUPERVISED BINARY ANOMALY CLASSIFICATION',
      target: 'IS_ANOMALY (0: Nominal, 1: Structural Anomaly)',
      featuresCount: 13,
      modelsComparison: [
        {
          name: 'XGBoost (Primary)',
          type: 'Gradient Boosted Decision Trees',
          strength: 'Sequential error reduction & complex tabular interaction handling',
          role: 'PRIMARY MODEL',
          accuracy: 0.964,
          rocAuc: 0.988,
          f1Score: 0.952,
          status: 'DEPLOYED / ACTIVE',
        },
        {
          name: 'Random Forest',
          type: 'Bagged Decision Trees',
          strength: 'Parallel tree voting & nonlinear relationship stability',
          role: 'COMPARISON MODEL',
          accuracy: 0.941,
          rocAuc: 0.969,
          f1Score: 0.929,
          status: 'BENCHMARK',
        },
        {
          name: 'Extra Trees Classifier',
          type: 'Extremely Randomized Trees',
          strength: 'Randomized threshold splits for variance reduction',
          role: 'COMPARISON MODEL',
          accuracy: 0.948,
          rocAuc: 0.976,
          f1Score: 0.938,
          status: 'CANDIDATE',
        },
        {
          name: 'Logistic Regression',
          type: 'Linear Classifier (Sigmoid)',
          strength: 'High interpretability & fast linear decision boundary',
          role: 'BASELINE MODEL',
          accuracy: 0.882,
          rocAuc: 0.912,
          f1Score: 0.854,
          status: 'BASELINE',
        },
      ],
    };
  }
}
