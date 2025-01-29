import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _cluster from 'cluster';
// import { cpus } from 'os';

const cluster = _cluster as unknown as _cluster.Cluster; // typings fix

@Injectable()
export class AppClusterConfig {
  private static logger: Logger = new Logger(AppClusterConfig.name);
  private static readonly configService: ConfigService = new ConfigService();
  static clusterize(bootstrap: () => Promise<void>): void {
    if (cluster.isPrimary) {
      const isDevelopment =
        AppClusterConfig.configService.get('NODE_ENV') === 'development';
      // const numCPUs: number = isDevelopment ? 1 : cpus().length;

      // NOTE: Cluster mode will create child process, and individual process will have it's own in memory data. For this reason, only runinning it with 1 CPU.

      const numCPUs: number = 1;

      this.logger.log(
        `Master server started on ${process.pid} with ${numCPUs} ${isDevelopment ? 'CPU (Development mode)' : 'CPUs'}`,
      );
      for (let i = 0; i < numCPUs; i++) cluster.fork();
      cluster.on('exit', () => cluster.fork());
      return;
    } else {
      this.logger.log(`Cluster server started on ${process.pid}`);
      void bootstrap();
    }
  }
}
