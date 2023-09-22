import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="w-[160px] h-[230px] sm:w-[200px] sm:h-[280px] md:w-[240px] md:h-[340px] lg:w-[280px] lg:h-[400px] inline-block cursor-pointer relative p-2 my-2"
    speed={2}
    width={260}
    height={380}
    viewBox="0 0 260 380"
    backgroundColor="#3a3838"
    foregroundColor="#1a1919"
  >
    <rect x="273" y="253" rx="0" ry="0" width="1" height="0" />
    <rect x="256" y="213" rx="0" ry="0" width="0" height="2" />
    <rect x="107" y="233" rx="0" ry="0" width="1" height="0" />
    <rect x="-1" y="6" rx="15" ry="15" width="260" height="380" />
  </ContentLoader>
);

export default Skeleton;
