interface titleProp {
  title: string;
}

function Title({ title }: titleProp) {
  return (
    <>
      <div className="text-3xl font-semibold">{title}</div>
      <div className="border-b-2 w-full border-gray-200 mt-2 mb-8"></div>
    </>
  );
}

export default Title;
