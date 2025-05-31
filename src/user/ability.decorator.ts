import { SetMetadata } from '@nestjs/common';
import { User } from '~/mongo/user.schema';

export const CHECK_ABILITY = 'check_ability';
export type PermissionKey = User['access'][number];

export const CheckAbility = (...permissionsKeys: PermissionKey[]) =>
  SetMetadata(CHECK_ABILITY, permissionsKeys);
