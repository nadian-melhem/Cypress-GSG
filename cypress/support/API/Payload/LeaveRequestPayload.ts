export interface LeaveRequestPayload {
    leaveTypeId: number,
    fromDate: string,
    toDate:string,
    comment: object,
    partialOption: string,
    duration: {
        type: string
    }
}