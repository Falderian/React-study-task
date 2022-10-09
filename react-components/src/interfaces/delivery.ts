export interface IDeliveryPackage {
  name: string;
  dateSend: string;
  optionDelivery: string;
  courier: string;
  imageSrc: string;
}

export type IDeliveryPackageS = IDeliveryPackage[];
