import { GET } from '@/apis/request';
import { type K8sVO } from '@/views/k8s/apis/interface';
import { EnumK8sStatusType } from '@/views/k8s/types/types';

/**
 * 获取k8s列表
 * @param params 参数
 * @param params.appId 应用ID
 * @returns
 */
export async function getK8sListApi(params: {
  appId?: string; // 应用ID
}): Promise<K8sVO[]> {
  return [
    {
      id: 10000,
      image: 'image-dev-v1.0.0',
      status: EnumK8sStatusType.Healthy,
      desc: 'image18-v542-5755d7d95d',
      children: [
        {
          id: 11000,
          image: 'image-dev-v1.1.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d',
          children: [
            {
              id: 11100,
              image: 'image-dev-v1.1.1',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 11200,
              image: 'image-dev-v1.1.2',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 11300,
              image: 'image-dev-v1.1.3',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 11400,
              image: 'image-dev-v1.1.4',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            }
          ]
        },
        {
          id: 12000,
          image: 'image-dev-v2.0.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d',
          children: [
            {
              id: 12100,
              image: 'image-dev-v2.1.1',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 12200,
              image: 'image-dev-v2.2.2',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            }
          ]
        },
        {
          id: 13000,
          image: 'image-dev-v3.0.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d',
          children: [
            {
              id: 13100,
              image: 'image-dev-v3.3.1',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 13200,
              image: 'image-dev-v3.3.2',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            },
            {
              id: 13300,
              image: 'image-dev-v3.3.3',
              status: EnumK8sStatusType.Healthy,
              desc: 'image18-v542-5755d7d95d',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 20000,
      image: 'image-dev-v1.0.0',
      status: EnumK8sStatusType.Healthy,
      desc: 'image18-v542-5755d7d95d',
      children: [
        {
          id: 21000,
          image: 'image-dev-v1.1.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d'
        },
        {
          id: 22000,
          image: 'image-dev-v1.2.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d'
        }
      ]
    },
    {
      id: 30000,
      image: 'image-dev-v1.0.0',
      status: EnumK8sStatusType.Healthy,
      desc: 'image18-v542-5755d7d95d',
      children: [
        {
          id: 31000,
          image: 'image-dev-v1.0.0',
          status: EnumK8sStatusType.Healthy,
          desc: 'image18-v542-5755d7d95d'
        }
      ]
    }
  ];
  const rsp: any = await GET<K8sVO[]>('/app/k8s/resource/tree', params);
  return rsp?.data ?? [];
}
