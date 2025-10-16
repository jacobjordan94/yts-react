import * as React from 'react';
import * as Primitive from '../card';

export const Header = (props: React.ComponentProps<'div'> & { asChild?: boolean }) => (
    <Primitive.CardHeader {...props} />
);
