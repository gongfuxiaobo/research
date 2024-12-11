import { type EnumK8sStatusType } from '@/views/k8s/types/types';

/**
 * k8s列表接口信息
 */
export interface K8sVO {
  id: number; // 资源ID
  image: string; // 镜像
  status: EnumK8sStatusType; // 状态
  desc: string; // 描述
  children?: K8sVO[]; // 资源子集
}
