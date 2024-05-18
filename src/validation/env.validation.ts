import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  Port: number;
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validateConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );

  const errors = validateSync(validateConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validateConfig;
}