import mysql from "mysql2/promise";

// Create connection pool (reused across requests for better performance)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "fiordani",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Type-safe query function
export async function query<T>(
  sql: string,
  params: any[] = []
): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

export default pool;
