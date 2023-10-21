
import { faker } from '@faker-js/faker';
import { CandidateApiPayload } from '../API/Payload/CandidateApiPayload';

export default class CandidatePayloadInit{
  static initCandidate(): CandidateApiPayload{
    let candidateDetails : CandidateApiPayload= {
          comment: null,
          consentToKeepData: false,
          contactNumber: null,
          dateOfApplication: null,
          email: faker.internet.email(),
          firstName: faker.internet.userName(),
          keywords: null,
          lastName: faker.internet.displayName(),
          middleName: null,
          vacancyId: 1
        
    }
    return candidateDetails;
  }
}