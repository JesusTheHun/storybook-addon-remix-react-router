import { AutoRc } from 'auto';

export default function rc(): AutoRc {
  return {
    plugins: ['npm', 'conventional-commits'],
  };
}
