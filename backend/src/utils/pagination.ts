export function getPaginationBounds(index?: number, per_page?: number): { start: number; end: number } {
    let start = 0;
    let end = 100;
  
    if (index && per_page) {
      start = (index - 1) * per_page;
      end = start + per_page - 1;
    }
  
    return { start, end };
  }