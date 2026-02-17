import { parse } from "node-html-parser";

/**
 * Parses an HTML table string into a 2D array of strings
 * Replicates PHP's DOMDocument behavior from the original endpoints
 *
 * @param htmlString - HTML string containing a table
 * @returns 2D array where each row contains cell values
 */
export function parseHtmlTable(htmlString: string): string[][] {
  // Parse the HTML string
  const root = parse(htmlString);

  // Find all table rows
  const rows = root.querySelectorAll("tr");

  const result: string[][] = [];

  // Iterate through each row
  rows.forEach((row) => {
    // Find all cells in the row
    const cells = row.querySelectorAll("td");
    const rowData: string[] = [];

    // Extract text content from each cell
    cells.forEach((cell) => {
      rowData.push(cell.textContent.trim());
    });

    // Only add rows that have content
    if (rowData.length > 0) {
      result.push(rowData);
    }
  });

  return result;
}
