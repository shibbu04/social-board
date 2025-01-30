import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { ImagePlus, Pencil, Trash2, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useThemeStore from '../store/themeStore';

const postSchema = z.object({
  caption: z.string().min(1, 'Caption is required'),
  images: z.any()
    .refine((files) => files?.length > 0, 'At least one image is required')
    .refine(
      (files) => Array.from(files).every((file) => file.type.startsWith('image/')),
      'Only image files are allowed'
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      'Each image must be less than 5MB'
    ),
});

type PostFormData = z.infer<typeof postSchema>;

const Dashboard = () => {
  const { user } = useAuthStore();
  const { posts, userPosts, loading, fetchUserPosts, createPost, deletePost, updatePost } = usePostStore();
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { theme } = useThemeStore();
  const isGreenTheme = theme === 'green';

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (user?._id) {
      fetchUserPosts(user._id);
    }
  }, [user?._id, fetchUserPosts]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      const formData = new FormData();
      formData.append('caption', data.caption);
      Array.from(data.images).forEach((file) => {
        formData.append('images', file);
      });

      await createPost(formData);
      toast.success('Post created successfully!');
      reset();
      setPreviewImages([]);
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        toast.success('Post deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleUpdate = async (postId: string, caption: string) => {
    try {
      await updatePost(postId, caption);
      setEditingPost(null);
      toast.success('Post updated successfully!');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8`}>
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className={`w-12 h-12 mb-4 ${isGreenTheme ? 'text-theme-green-400' : 'text-gray-400'}`} />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  {...register('images')}
                  onChange={(e) => {
                    register('images').onChange(e);
                    handleImageChange(e);
                  }}
                />
              </label>
            </div>
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images.message as string}</p>
            )}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImages(previewImages.filter((_, i) => i !== index));
                        const dt = new DataTransfer();
                        const files = watch('images');
                        Array.from(files).forEach((file, i) => {
                          if (i !== index) dt.items.add(file);
                        });
                        const newFiles = dt.files;
                        register('images').onChange({
                          target: { files: newFiles },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              {...register('caption')}
              rows={3}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                isGreenTheme 
                  ? 'focus:border-theme-green-500 focus:ring-theme-green-500' 
                  : 'focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              placeholder="Write a caption for your post..."
            />
            {errors.caption && (
              <p className="mt-1 text-sm text-red-600">{errors.caption.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isGreenTheme
                ? 'bg-theme-green-600 hover:bg-theme-green-700 focus:ring-theme-green-500'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Your Posts</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : userPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No posts yet</div>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{post.user.name}</span>
                    <span className="text-gray-500">{post.user.socialHandle}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingPost(post._id)}
                      className={`p-2 transition-colors ${
                        isGreenTheme 
                          ? 'text-gray-600 hover:text-theme-green-600' 
                          : 'text-gray-600 hover:text-indigo-600'
                      }`}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {editingPost === post._id ? (
                  <div className="space-y-4">
                    <textarea
                      defaultValue={post.caption}
                      className={`w-full p-2 border rounded-md ${
                        isGreenTheme 
                          ? 'focus:border-theme-green-500 focus:ring-theme-green-500' 
                          : 'focus:border-indigo-500 focus:ring-indigo-500'
                      }`}
                      rows={3}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleUpdate(post._id, e.currentTarget.value);
                        }
                      }}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingPost(null)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          const textarea = e.currentTarget.parentElement?.previousElementSibling as HTMLTextAreaElement;
                          handleUpdate(post._id, textarea.value);
                        }}
                        className={`px-4 py-2 text-sm text-white rounded-md ${
                          isGreenTheme
                            ? 'bg-theme-green-600 hover:bg-theme-green-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 mb-4">{post.caption}</p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${import.meta.env.VITE_UPLOADS_URL}${image}`}
                      alt={`Post ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
