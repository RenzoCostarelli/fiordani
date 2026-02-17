import { query } from "@/lib/db";
import { parseHtmlTable } from "@/lib/parseHtmlTable";

interface PizarraRow {
  id: number;
  ts_creacion: Date;
  tabla: string;
}

export interface PizarraData {
  fecha_solicitada: string;
  id: number;
  fecha_db: string;
  tabla_html: string;
  tabla_json: string[][];
}

/**
 * Fetches pizarra data for a specific date from the database
 * @param fecha - Date in YYYY-MM-DD format
 * @returns PizarraData or null if no data found
 */
export async function getPizarraData(
  fecha: string
): Promise<PizarraData | null> {
  try {
    // Query database for the specific date
    const results = await query<PizarraRow[]>(
      "SELECT id, ts_creacion, tabla FROM pizarra WHERE DATE(ts_creacion) = ? ORDER BY id DESC LIMIT 1",
      [fecha]
    );

    // No data found for this date
    if (results.length === 0) {
      return null;
    }

    const row = results[0];

    // Parse HTML table to JSON
    const tabla_json = parseHtmlTable(row.tabla);

    // Format database timestamp to YYYY-MM-DD
    const fecha_db = row.ts_creacion.toISOString().split("T")[0];

    return {
      fecha_solicitada: fecha,
      id: row.id,
      fecha_db: fecha_db,
      tabla_html: row.tabla,
      tabla_json: tabla_json,
    };
  } catch (error) {
    console.error("Error fetching pizarra data:", error);
    throw error;
  }
}

/**
 * Fetches pizarra rosario data for a specific date from the database
 * @param fecha - Date in YYYY-MM-DD format
 * @returns PizarraData or null if no data found
 */
export async function getPizarraRosarioData(
  fecha: string
): Promise<PizarraData | null> {
  try {
    // Query database for the specific date
    const results = await query<PizarraRow[]>(
      "SELECT id, ts_creacion, tabla FROM pizarra_rosario WHERE DATE(ts_creacion) = ? ORDER BY id DESC LIMIT 1",
      [fecha]
    );

    // No data found for this date
    if (results.length === 0) {
      return null;
    }

    const row = results[0];

    // Parse HTML table to JSON
    const tabla_json = parseHtmlTable(row.tabla);

    // Format database timestamp to YYYY-MM-DD
    const fecha_db = row.ts_creacion.toISOString().split("T")[0];

    return {
      fecha_solicitada: fecha,
      id: row.id,
      fecha_db: fecha_db,
      tabla_html: row.tabla,
      tabla_json: tabla_json,
    };
  } catch (error) {
    console.error("Error fetching pizarra rosario data:", error);
    throw error;
  }
}
