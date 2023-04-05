const Spinner = () => {
  return (
    <div class="flex items-center ml-4">
      <strong>Chef, your recipes are arriving shortly...</strong>
      <div
        class="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
