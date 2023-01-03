class BaseEntity<T> {
  id: T;
  
  createdDate: Date | string;
  updatedDate: Date | string;
  deletedDate: Date | string;

  createdBy: string;
  updatedBy: string;
  deletedBy: string;
}
