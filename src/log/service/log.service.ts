import { Injectable } from '@nestjs/common';
import { ConsoleColors } from '../../util/constants/console-color.contant';

@Injectable()
export class LoggingService {
  // generally used to log errors
  public logErrors(message: string, err: any) {
    console.error(
      ConsoleColors.FgRed + '%s' + ConsoleColors.Reset,
      `Error Log: [${new Date()}] - ${message}`,
      err,
    );
  }

  // generally used to log when something needs attention
  public logActions(action: string, context?: any) {
    console.info(
      ConsoleColors.FgYellow + '%s' + ConsoleColors.Reset,
      `Action Log: [${new Date()}] - ${action}`,
      context ?? '',
    );
  }

  // generally used to log some valuable info required to track task completions
  public logInfo(info: string, context?: any) {
    console.info(
      ConsoleColors.FgCyan + '%s' + ConsoleColors.Reset,
      `Info Log: [${new Date()}] - ${info}`,
      context ?? '',
    );
  }

  // generally used while development process to log things
  public debugLog(debug: string, context?: any) {
    console.debug(
      ConsoleColors.BgGray + '%s' + ConsoleColors.Reset,
      `Debug Log: [${new Date()}] - ${debug}`,
      context ?? '',
    );
  }
}
