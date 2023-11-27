import {
    DocumentMarkBold,
    DocumentMarkCode,
    DocumentMarkColor,
    DocumentMarkItalic,
    DocumentMarkStrikethrough,
    DocumentText,
    DocumentTextMark,
} from '@gitbook/api';
import React from 'react';

import { tcls } from '@/lib/tailwind';

export function Text(props: { text: DocumentText }) {
    const { text } = props;

    return (
        <>
            {text.leaves.map((leaf, index) => {
                return (
                    <React.Fragment key={index}>
                        {leaf.marks.reduce<React.ReactNode>((children, mark, index) => {
                            const Mark = MARK_STYLES[mark.type];

                            if (!Mark) {
                                return children;
                            }

                            // @ts-ignore
                            return <Mark mark={mark}>{children}</Mark>;
                        }, leaf.text)}
                    </React.Fragment>
                );
            })}
        </>
    );
}

const MARK_STYLES = {
    bold: Bold,
    italic: Italic,
    code: Code,
    strikethrough: Strikethrough,
    color: Color,
};

interface MarkedLeafProps<Mark extends DocumentTextMark> {
    mark: Mark;
    children: React.ReactNode;
}

function Bold(props: MarkedLeafProps<DocumentMarkBold>) {
    return <strong className={tcls('font-semibold')}>{props.children}</strong>;
}

function Italic(props: MarkedLeafProps<DocumentMarkItalic>) {
    return <i className={tcls('font-italic')}>{props.children}</i>;
}

function Strikethrough(props: MarkedLeafProps<DocumentMarkStrikethrough>) {
    return <s className={tcls('line-through')}>{props.children}</s>;
}

function Code(props: MarkedLeafProps<DocumentMarkCode>) {
    return (
        <code className={tcls('text-slate-800', 'bg-slate-100', 'rounded', 'py-0.5', 'px-1')}>
            {props.children}
        </code>
    );
}

function Color(props: MarkedLeafProps<DocumentMarkColor>) {
    // TODO
    return <span>{props.children}</span>;
}