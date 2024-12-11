/**
 * k8s状态类型枚举
 */
export enum EnumK8sStatusType {
  Healthy = 'Healthy',
  Running = 'Running',
  Synced = 'Synced',
  OutOfSync = 'OutOfSync ',
  Progressing = 'Progressing',
  Missing = 'Missing'
}
