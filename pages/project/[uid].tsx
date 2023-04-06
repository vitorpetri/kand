import { createClient } from '../../prismicio'
import sm from '../../sm.json'

export default function Projects({project}: any) {
  return (
    <div><span>{ project.title }</span></div>
  )
}

export async function getServerSideProps(context: { params: { uid: string } }) {
  const { uid } = context.params

  const client = createClient({ accessToken: sm.token })
  const res = await client.getByUID('project', uid)

  if (!res) return { notFound: true }

  const project = res.data

  return {
    props: {
      project
    }
  }
}