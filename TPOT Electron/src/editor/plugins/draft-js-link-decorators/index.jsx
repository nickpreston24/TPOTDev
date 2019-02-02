import LinkSpan from './components/LinkSpan';
import * as strategies from './utils/strategies';

const createLinkDecoratorsPlugin = () => {
    return {
        decorators: [
            {
                strategy: strategies.entity,
                component: LinkSpan,
            },
            {
                strategy: strategies.generic,
                component: LinkSpan,
            },
        ],
    };
};

export default createLinkDecoratorsPlugin