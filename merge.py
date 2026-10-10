import json

print("Loading metadata...")
with open("readup_all_data.json", "r", encoding="utf-8") as f:
    meta_array = json.load(f)

print("Loading contents...")
with open("full_contents.json", "r", encoding="utf-8") as f:
    contents_dict = json.load(f)

print(f"Meta items: {len(meta_array)}")
print(f"Content items: {len(contents_dict)}")

merged_array = []
merged_count = 0

for item in meta_array:
    item_id = item.get("id")
    if item_id in contents_dict:
        # Merge dictionaries
        # contents override meta or vice-versa? Let's update item with contents
        content_item = contents_dict[item_id]
        item.update(content_item)
        merged_count += 1
    merged_array.append(item)

print(f"Merged {merged_count} items with full content!")

with open("readup_all_data_merged.json", "w", encoding="utf-8") as f:
    json.dump(merged_array, f, ensure_ascii=False, indent=2)

print("Saved to readup_all_data_merged.json!")
