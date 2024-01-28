import { OkPacket, QueryError, RowDataPacket } from "mysql2";
import { connection } from "../db/connection";
import Department from "../model/Department";

async function getAllDepartments(): Promise<Department[]> {
  return new Promise<Department[]>((resolve, reject) => {
    const query = `
            SELECT * FROM Department`;
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const rows = results as RowDataPacket[];
      const departments: Department[] = rows.map((row: any) => ({
        id: row.id,
        name: row.name,
      }));
      resolve(departments);
    });
  });
}

export async function getDepartments(
  callback: (error: QueryError | null, employees?: Department[]) => void
) {
  try {
    const employees = await getAllDepartments();
    callback(null, employees);
  } catch (error: any) {
    callback(error);
  }
}