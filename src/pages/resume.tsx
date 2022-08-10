import styled from '@emotion/styled'
import { motion } from 'framer-motion'

import { PageMeta } from '@/common/components/Meta'
import { Content, Meta as ResumeMeta } from '@/modules/resume/components'

const ResumeWrapper = styled.div({
  display: 'flex',
  backgroundColor: 'var(--bg-secondary)',
  width: '100%',
  padding: '1.5rem 2.5rem',
  borderRadius: '.5rem',
  flexDirection: 'column',
})

const Resume = () => {
  return (
    <motion.div
      variants={{
        before: { opacity: 0, y: 20, transition: { type: 'spring' } },
        after: { opacity: 1, y: 0, transition: { type: 'spring' } },
      }}
      initial='before'
      animate='after'
    >
      <PageMeta title='Resume' />
      <ResumeWrapper>
        <ResumeMeta />
        <Content />
      </ResumeWrapper>
    </motion.div>
  )
}

export default Resume