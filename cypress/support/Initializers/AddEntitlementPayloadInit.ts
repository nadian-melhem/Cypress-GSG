import { addEntitlementPayload } from "../API/Payload/AddEntitlementPayLoad";

export default class AddEntitlementPayloadInit {
    static initEntitlement(empNumber): addEntitlementPayload {
        let entitlementDetails: addEntitlementPayload = {
            empNumber: empNumber,
            leaveTypeId: 1,
            fromDate: "2023-01-01",
            toDate: "2024-01-01",
            entitlement: Math.floor(Math.random() * 100).toString()
        }
        return entitlementDetails;
    }

}