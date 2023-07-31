import R from 'ramda';
import path from 'path';

const getFileName = (filePath: string) =>
	path.basename(filePath, path.extname(filePath));

const kebabToCamel = (str: string) =>
	str.replace(/-([a-z])/gi, (a, b) => b.toUpperCase());

const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

const appendString = R.curry((str) => R.flip(R.concat)(str));

export const formatCapitalizedWithAppend = (str: string) =>
	R.pipe(getFileName, kebabToCamel, capitalize, appendString(str));
