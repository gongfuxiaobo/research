import { type EnumK8sStatusType } from '@/views/k8s/types/types';
import { type K8sVO } from '@/views/k8s/apis/interface';
import { getK8sListApi } from '@/views/k8s/apis/apis';

/**
 * k8s
 */
export default class K8s {
  public id: number; // 资源ID
  public image: string; // 镜像
  public status: EnumK8sStatusType; // 状态
  public desc: string; // 描述
  public children: K8s[]; // 资源子集
  public number: number = 1; // 子集数量

  constructor(data: any) {
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.desc = data.desc;
    this.children = data.children?.map((item: K8sVO) => new K8s(item)) ?? [];
    this.number = this.getLastChildNumber(data.children) || 1;
  }

  /**
   * 获取k8s列表
   * @param appId 应用ID
   * @returns
   */
  public static async getK8sList(appId?: string): Promise<K8s[]> {
    const data: K8sVO[] = await getK8sListApi({
      appId
    });
    return data?.map((item: K8sVO) => new K8s(item));
  }

  /**
   * 获取最后一层节点数量
   * @param k8s k8s数据
   * @returns
   */
  public getLastChildNumber(k8s: K8sVO[]): number {
    let num: number = 0;
    if (k8s?.length) {
      k8s?.forEach((item: K8sVO) => {
        if (item.children?.length) {
          num += this.getLastChildNumber(item.children);
        } else {
          num++;
        }
      });
    }
    return num;
  }
}
