import React from 'react'
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../models/UserType'

const JobPostingsPage = () => {
  return (
    <div>
      Job Postings
    </div>
  )
}

export default pageWrapper(JobPostingsPage, { authorisedUserTypes: [EUserType.Company] })
