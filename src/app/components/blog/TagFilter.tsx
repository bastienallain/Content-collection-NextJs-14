'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

export default function TagFilter({ tags }: { tags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(
    searchParams.get('tag')
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    setSelectedTag(searchParams.get('tag'));
  }, [searchParams]);

  const filteredTags =
    query === ''
      ? tags
      : tags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase()));

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
    } else {
      router.push('/blog');
    }
    setQuery('');
  };

  const clearSelection = () => {
    setSelectedTag(null);
    setQuery('');
    router.push('/blog');
  };

  return (
    <Combobox value={selectedTag} onChange={handleTagSelect} nullable>
      <div className="relative mt-2">
        <div className="flex">
          <ComboboxInput
            className="w-full rounded-l-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(tag: string | null) => tag || ''}
          />
          {selectedTag && (
            <button
              onClick={clearSelection}
              className="absolute inset-y-0 right-8 flex items-center pr-2"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          )}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredTags.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredTags.map((tag) => (
              <ComboboxOption
                key={tag}
                value={tag}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {tag}
                    </span>
                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-indigo-600'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
