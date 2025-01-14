
export interface IMonthlySummaryItem {
    monthIndex: number;
    monthName: string;
    taskItemCount: number;
}

export class MonthlySummaryItem implements IMonthlySummaryItem {
    monthIndex: number;
    monthName: string;
    taskItemCount: number;

    constructor(init: { monthIndex: number; monthName: string, itemCount: number }) {
        this.monthIndex = init.monthIndex;
        this.monthName = init.monthName;
        this.taskItemCount = init.itemCount;
    }
}