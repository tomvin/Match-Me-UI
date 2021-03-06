import { PillVariant } from "../Pill/Pill";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface BaseListItemVM {
  route: string;
  title: string;
  description?: string;
  pillText: string;
  pillVariant: PillVariant;
  variant: 'primary' | 'gray';
  deleteItem?: () => void;
}

interface ListItemImageVariantVM extends BaseListItemVM {
  type: 'image';
  imageUrl: string;
}

interface ListItemIconVariantVM extends BaseListItemVM {
  type: 'icon';
  icon: IconProp;
}

export type ListItemVM = ListItemIconVariantVM | ListItemImageVariantVM;