import type { Translations } from "../i18n/types";

export const serviceTypeMap = (
  type: string | number,
  t: Translations,
): string => {
  const key = String(type);
  switch (key) {
    case "0":
      return t.admin.services.type.option1;
    case "1":
      return t.admin.services.type.option2;
    case "2":
      return t.admin.services.type.option3;
    case "3":
      return t.admin.services.type.option4;
    case "4":
      return t.admin.services.type.option5;
    case "5":
      return t.admin.services.type.option6;
    case "6":
      return t.admin.services.type.option7;
    default:
      return t.services.menuTitle;
  }
};
