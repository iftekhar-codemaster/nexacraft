export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          currency_preference: 'USD' | 'BDT'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          currency_preference?: 'USD' | 'BDT'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          currency_preference?: 'USD' | 'BDT'
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price_usd: number
          price_bdt: number
          stock: number
          category: string | null
          model_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_usd: number
          price_bdt: number
          stock?: number
          category?: string | null
          model_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_usd?: number
          price_bdt?: number
          stock?: number
          category?: string | null
          model_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_designs: {
        Row: {
          id: string
          product_id: string
          design_name: string
          design_description: string | null
          design_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          design_name: string
          design_description?: string | null
          design_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          design_name?: string
          design_description?: string | null
          design_image_url?: string | null
          created_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string | null
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          alt_text?: string | null
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      product_specifications: {
        Row: {
          id: string
          product_id: string
          spec_name: string
          spec_value: string
          sort_order: number
        }
        Insert: {
          id?: string
          product_id: string
          spec_name: string
          spec_value: string
          sort_order?: number
        }
        Update: {
          id?: string
          product_id?: string
          spec_name?: string
          spec_value?: string
          sort_order?: number
        }
      }
      custom_design_requests: {
        Row: {
          id: string
          user_id: string | null
          design_description: string
          reference_images: string[] | null
          preferred_colors: string | null
          placement: string | null
          quantity: number | null
          size: string | null
          estimated_price_usd: number | null
          estimated_price_bdt: number | null
          status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          design_description: string
          reference_images?: string[] | null
          preferred_colors?: string | null
          placement?: string | null
          quantity?: number | null
          size?: string | null
          estimated_price_usd?: number | null
          estimated_price_bdt?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          design_description?: string
          reference_images?: string[] | null
          preferred_colors?: string | null
          placement?: string | null
          quantity?: number | null
          size?: string | null
          estimated_price_usd?: number | null
          estimated_price_bdt?: number | null
          status?: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          total_amount: number
          currency: 'USD' | 'BDT'
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: any | null
          billing_address: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          total_amount: number
          currency: 'USD' | 'BDT'
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: any | null
          billing_address?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          total_amount?: number
          currency?: 'USD' | 'BDT'
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: any | null
          billing_address?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          price: number
          currency: string
          customization_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity: number
          price: number
          currency: string
          customization_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          price?: number
          currency?: string
          customization_notes?: string | null
          created_at?: string
        }
      }
      cart: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: string | null
          quantity: number
          selected_color: string | null
          selected_size: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cart_id: string
          product_id?: string | null
          quantity?: number
          selected_color?: string | null
          selected_size?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: string | null
          quantity?: number
          selected_color?: string | null
          selected_size?: string | null
          created_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          rating: number
          title: string | null
          comment: string | null
          verified_purchase: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          rating: number
          title?: string | null
          comment?: string | null
          verified_purchase?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          rating?: number
          title?: string | null
          comment?: string | null
          verified_purchase?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      review_images: {
        Row: {
          id: string
          review_id: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          image_url?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}