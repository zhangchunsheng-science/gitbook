import { JSONDocument, RevisionPageDocument, Space } from '@gitbook/api';
import React from 'react';

import { getDocumentSections } from '@/lib/document';
import { t } from '@/lib/intl';
import { tcls } from '@/lib/tailwind';

import { ScrollSectionsList } from './ScrollSectionsList';
import { SIDE_COLUMN_WITHOUT_HEADER, SIDE_COLUMN_WITH_HEADER } from '../layout';

/**
 * Aside listing the headings in the document.
 */
export function PageAside(props: {
    space: Space;
    page: RevisionPageDocument;
    document: JSONDocument | null;
    withHeaderOffset: boolean;
}) {
    const { space, document, withHeaderOffset } = props;
    const sections = document ? getDocumentSections(document) : [];

    return (
        <aside
            className={tcls(
                'hidden',
                'xl:flex',
                'flex-col',
                'basis-56',
                'grow-0',
                'shrink-0',
                'sticky',
                withHeaderOffset ? SIDE_COLUMN_WITH_HEADER : SIDE_COLUMN_WITHOUT_HEADER,
                'py-6',
            )}
        >
            {sections.length > 0 ? (
                <>
                    <div className={tcls('text-sm', 'font-semibold', 'pb-3')}>
                        {t({ space }, 'on_this_page')}
                    </div>
                    <div className={tcls('overflow-auto', 'flex-1')}>
                        <React.Suspense fallback={null}>
                            <ScrollSectionsList sections={sections} />
                        </React.Suspense>
                    </div>
                </>
            ) : null}
            <div></div>
        </aside>
    );
}