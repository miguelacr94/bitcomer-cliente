import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const PopOver = ({
  children,
  element,
  top = "-top-12",
  withShadow = true,
  useFullWidth = false,
  customWidth,
  popoverButtonClassName,
}) => {
  return (
    <div className="w-full">
      <Popover className="relative flex flex-col w-full  ">
        {({ open }) => (
          <>
            <Popover.Button className={`w-auto ${popoverButtonClassName}`}>
              {element}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute z-10 mt-2 bg-white rounded-md  text-grey-placeholderPlus   ${top} ${withShadow && "shadow-md  border-socialmedia border-solid border "
                  } ${customWidth ? customWidth : useFullWidth ? "w-full" : "w-auto"
                  }`}
              >
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopOver;
