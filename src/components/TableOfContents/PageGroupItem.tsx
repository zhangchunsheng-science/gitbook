import { RevisionPageDocument, RevisionPageGroup } from '@gitbook/api';

import { ContentRefContext } from '@/lib/references';
import { tcls } from '@/lib/tailwind';

import { PagesList } from './PagesList';

export function PageGroupItem(props: {
    page: RevisionPageGroup;
    activePage: RevisionPageDocument;
    ancestors: Array<RevisionPageDocument | RevisionPageGroup>;
    context: ContentRefContext;
}) {
    const { page, activePage, ancestors, context } = props;

    return (
        <li className={tcls('flex', 'flex-col', 'my-3')}>
            <div className={tcls('px-2', 'py-2', 'text', 'font-medium')}>{page.title}</div>
            {page.pages && page.pages.length ? (
                <PagesList
                    pages={page.pages}
                    activePage={activePage}
                    ancestors={ancestors}
                    context={context}
                />
            ) : null}
        </li>
    );
}