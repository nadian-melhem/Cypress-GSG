import { LeaveRequestPayload } from "../API/Payload/LeaveRequestPayload";

export class LeaveRequestPayloadInit{
    static initLeaveRequest() : LeaveRequestPayload {
        let request: LeaveRequestPayload = {
            leaveTypeId: 1,
            fromDate: "2023-10-25",
            toDate: "2023-10-26",
            comment: null,
            partialOption: "all",
            duration: {
                type: "half_day_morning"
            }
        }
        return request
    }
}