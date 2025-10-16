import * as React from 'react';
import * as Primitive from '../card';

export const Action = (props: React.ComponentProps<'div'> & { asChild?: boolean }) => (
    <Primitive.CardAction {...props} />
);
