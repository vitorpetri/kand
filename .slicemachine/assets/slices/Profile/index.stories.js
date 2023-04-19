import MyComponent from '../../../../slices/Profile';

export default {
  title: 'slices/Profile'
}


export const _Default = () => <MyComponent slice={{"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading1","text":"Worker","spans":[]}],"description":[{"type":"paragraph","text":"Adipisicing eu duis quis sunt exercitation esse amet.","spans":[]}]},"id":"_Default","slice_type":"profile"}} />
_Default.storyName = ''

export const _Profile = () => <MyComponent slice={{"variation":"profile","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"name":"balance","last_name":"jungle","role":"stock","image":{"dimensions":{"width":4160,"height":3120},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1560457079-9a6532ccb118"}},"id":"_Profile","slice_type":"profile"}} />
_Profile.storyName = ''

export const _Accomplishments = () => <MyComponent slice={{"variation":"accomplishments","version":"sktwi1xtmkfgx8626","items":[{"item":"usually","sub_item":"view"}],"primary":{"topic":"contain"},"id":"_Accomplishments","slice_type":"profile"}} />
_Accomplishments.storyName = ''
