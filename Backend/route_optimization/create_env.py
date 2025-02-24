def create_env_file():
    env_content = """GOOGLE_MAPS_API_KEY=AIzaSyAPydVVdnzBM_-FmUjUBssGRXWI_cF53ek
DEBUG=True
"""
    
    with open('.env', 'w', encoding='utf-8', newline='\n') as f:
        f.write(env_content)

if __name__ == "__main__":
    create_env_file()
    print(".env file created successfully!") 