import Awards from '../Awards';
import Clients from '../Clients';
import Crew from '../Crew';
import Description from '../Description';
import Gallery from '../Gallery';
import Profile from '../Profile';
import SeparatorLine from '../SeparatorLine';

const MAP = {
    Awards,
    Clients,
    Crew,
    Description,
    Gallery,
    Profile,
    SeparatorLine,
};

function Render(content) {
    return content.map((section, index) => {
        const name = section.fieldGroupName ? section.fieldGroupName.replace('Page_Fields_Content_', '') : null;
        const Component = MAP[name];

        return Component && <Component {...section} key={index} />;
    });
}

export default Render;
