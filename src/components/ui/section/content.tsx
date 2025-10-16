import * as React from 'react';
import * as Primitive from '../card';

export const Content = (props: React.ComponentProps<'div'> & { asChild?: boolean }) => (
    <Primitive.CardContent {...props} />
);
