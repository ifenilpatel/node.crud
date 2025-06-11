import { toUtcIsoString } from '../../utils/momentHandler.js';

class DepartmentDTO {
  constructor(item) {
    this.department_id = item.department_id ?? 0;
    this.title = item.title ?? '';
    this.created_at = item.created_at ?? null;
    this.updated_at = item.updated_at ?? null;
  }

  static toSelection(items = []) {
    return items.map((item) => {
      const data = item.dataValues ?? item;
      return {
        department_id: data.department_id,
        title: data.title,
      };
    });
  }

  static toDto(item) {
    const data = item.dataValues ?? item;
    const formattedItem = {
      ...data,
      created_at: toUtcIsoString(data.created_at),
      updated_at: toUtcIsoString(data.updated_at),
    };
    return new DepartmentDTO(formattedItem);
  }

  static toList(items = []) {
    return items.map((item) => {
      const data = item.dataValues ?? item;
      const formattedItem = {
        ...data,
        created_at: toUtcIsoString(data.created_at),
        updated_at: toUtcIsoString(data.updated_at),
      };
      return new DepartmentDTO(formattedItem);
    });
  }
}

export default DepartmentDTO;
