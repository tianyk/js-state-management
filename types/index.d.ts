declare module '*.png' {
    const value: string;
    export default value;
}

// declare module '*.svg' {
//     const value: string;
//     export default value;
// }

declare module '*.svg' {
    import * as React from 'react';

    const ReactComponent: React.FC<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >

    export default ReactComponent
}