import {
  ISensorProvider,
  IMLProvider,
  IBridgeProvider,
  IReportProvider,
  IDatabaseProvider,
  IDocumentProvider,
} from './providers/interfaces';
import { MockSensorProvider } from './providers/MockSensorProvider';
import { MockMLProvider } from './providers/MockMLProvider';
import { MockBridgeProvider } from './providers/MockBridgeProvider';
import { MockReportProvider } from './providers/MockReportProvider';
import { MockDatabaseProvider } from './providers/MockDatabaseProvider';
import { MockDocumentProvider } from './providers/MockDocumentProvider';

class ServiceRegistry {
  public sensorProvider: ISensorProvider;
  public mlProvider: IMLProvider;
  public bridgeProvider: IBridgeProvider;
  public reportProvider: IReportProvider;
  public databaseProvider: IDatabaseProvider;
  public documentProvider: IDocumentProvider;

  constructor() {
    this.sensorProvider = new MockSensorProvider();
    this.mlProvider = new MockMLProvider();
    this.bridgeProvider = new MockBridgeProvider();
    this.reportProvider = new MockReportProvider();
    this.databaseProvider = new MockDatabaseProvider();
    this.documentProvider = new MockDocumentProvider();
  }

  public registerProviders(providers: {
    sensor?: ISensorProvider;
    ml?: IMLProvider;
    bridge?: IBridgeProvider;
    report?: IReportProvider;
    database?: IDatabaseProvider;
    document?: IDocumentProvider;
  }) {
    if (providers.sensor) this.sensorProvider = providers.sensor;
    if (providers.ml) this.mlProvider = providers.ml;
    if (providers.bridge) this.bridgeProvider = providers.bridge;
    if (providers.report) this.reportProvider = providers.report;
    if (providers.database) this.databaseProvider = providers.database;
    if (providers.document) this.documentProvider = providers.document;
  }
}

export const services = new ServiceRegistry();
