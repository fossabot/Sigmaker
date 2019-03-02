import React from 'react';
import { shape, string, oneOfType, node, arrayOf } from 'prop-types';
import placeholders from '../placeholders';

const lineHeight = 1.5;

const Link = ({ children, href, style, ...props }) => (
    <a
        href={href}
        style={{
            color: '#0000ee',
            textDecoration: 'underline',
            lineHeight,
            ...style
        }}
        {...props}
    >
        {children}
    </a>
);

Link.propTypes = {
    children: oneOfType([node, arrayOf(node)]).isRequired,
    href: string.isRequired,
    style: shape({})
};

Link.defaultProps = {
    style: {}
};

const Signature = ({ contact }) => {
    const {
        firstName,
        lastName,
        role,
        email,
        phone: _phone,
        phoneUri
    } = Object.keys(contact).reduce((acc, key) => {
        acc[key] = contact[key] === '' ? placeholders[key] : contact[key];
        return acc;
    }, {});

    const phone = `+1 ${_phone}`;

    return (
        <>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <title />
                </head>
                <body
                    style={{
                        wordWrap: 'break-word',
                        WebkitNbspMode: 'space',
                        lineBreak: 'after-white-space'
                    }}
                >
                    Best,
                    <br />
                    {firstName}
                    <hr
                        style={{
                            boxSizing: 'content-box',
                            height: 0,
                            overflow: 'visible',
                            margin: '1.5rem auto',
                            border: 0,
                            borderTop: '1px solid rgba(0,0,0,0.1)',
                            display: 'block',
                            marginInlineStart: 'auto',
                            marginInlineEnd: 'auto'
                        }}
                    />
                    <table
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ width: '100%' }}
                    >
                        <tbody>
                            <tr>
                                <td>
                                    <b
                                        style={{
                                            fontWeight: 'bolder',
                                            lineHeight
                                        }}
                                    >
                                        {firstName} {lastName}
                                    </b>
                                    <br />
                                    <span style={{ lineHeight }}>{role}</span>
                                    <br />
                                    <Link
                                        href={`mailto:${email}`}
                                        style={{
                                            fontSize: '80%'
                                        }}
                                    >
                                        {email}
                                    </Link>{' '}
                                    <span
                                        style={{
                                            fontSize: '80%',
                                            color: 'rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        |
                                    </span>{' '}
                                    <Link
                                        href={phoneUri}
                                        style={{
                                            fontSize: '80%'
                                        }}
                                    >
                                        {phone}
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
            </html>
        </>
    );
};

Signature.propTypes = {
    contact: shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
        role: string.isRequired,
        email: string.isRequired,
        phone: string.isRequired,
        phoneUri: string.isRequired
    }).isRequired
};

export default Signature;

export const signatureHeader =
    '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';