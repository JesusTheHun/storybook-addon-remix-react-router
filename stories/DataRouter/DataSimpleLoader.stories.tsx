import {withRouter} from '../../src';
import {useLoaderData} from 'react-router-dom';

function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

interface HomeLoaderData {
  date: string;
}

async function homeLoader(): Promise<HomeLoaderData> {
  await sleep();
  return {
    date: new Date().toISOString(),
  };
}

function Home() {
  let data = useLoaderData() as HomeLoaderData;
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}

export default {
  title: 'Example/DataSimpleLoader',
  component: Home,
  decorators: [withRouter],
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  reactRouter: {
    loader: homeLoader,
  }
}
