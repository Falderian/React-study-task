import { IDeliveryPackageS } from 'interfaces/delivery';

export const storage: IDeliveryPackageS = [];
export let imageStorage: string[] = [];

export const saveItemToStorage = (arr: string[], checked: boolean) => {
  const [name, dateSend, optionDelivery] = arr;
  const courier = checked ? 'да' : 'нет';
  const deliveryPackage = {
    name: name,
    dateSend: dateSend,
    optionDelivery: optionDelivery,
    courier: courier,
    imageSrc: imageStorage.slice(0, 1).toString(),
  };
  imageStorage = [];
  storage.push(deliveryPackage);
};
