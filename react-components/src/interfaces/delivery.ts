export interface IDeliveryPackage {
  name: string;
  dateSend: string;
  optionDelivery: string;
  courier: string;
  imageSrc: string;
}

export type formData = {
  name: string;
  date: Date;
  select: string;
  courier: boolean;
};

export interface IItemToRender {
  name: string;
  date: string;
  select: string;
  courier: boolean;
  imgSrc: string;
}

export type IDeliveryPackageS = IDeliveryPackage[];
